const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * @desc    Login
 * @route   POST /api/auth/login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Проверяем отправлены ли пароль и емаил
    if (!email || !password) {
        res.status(400).json({
        success: false,
        error: 'Email и пароль обязательны',
        });
        return;
    }

    // Ищем пользователя
    let user;
    try {
        user = await User.findOne({ email }).select('+password');
        console.log(user);
        if (!user) {
        res.status(401).json({
            success: false,
            error: 'Email или пароль не верны',
        });
        return;
        }
    } catch (error) {
        res.status(401).json({
        success: false,
        error: 'Email или пароль не верны',
        });
        return;
    }

    // Проверяем пароль
    console.log(password);
    console.log(user.password);
    const isMatch = await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
        res.status(401).json({
        success: false,
        error: 'Email или пароль не верныss',
        });
        return;
    }
    sendTokenResponse(user, 200, res);
};

/**
 * @desc    Получить залогиненного пользователя
 * @route   GET /api/auth/me
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getMe = async (req, res, next) => {
    // Проверка токена и получение пользователя по токену...дальше можно проверить права доступа
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        token = req.body['token'];
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
    } catch (error) {
        res.status(401).json({
        success: false,
        error: 'User not found or token is not provided',
        });
        return;
    }

    res.status(200).json({ success: true, data: req.user });
};

// Получаем JWT из модели и отправляем в ответ на запрос
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({ success: true, token: token});
};
