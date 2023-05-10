const Joi = require('joi');

const authSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(20).required().label('Username'),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')).label('Password'),
});

module.exports = async (req, res, next) => {
  authSchema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err.message);
      return res.cookie('authError', 'The username or password is incorrect').redirect('/');
    });
};
