export default ({errors, values, isAuth}) => {
    const result = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите E-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = 'Неправельный E-mail';
            }
        },
        fullname: (values) => {
            if (!values) {
                errors.fullName = "Укажите свое имя и фамилию";
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = "Введите пароль";
            } else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
                errors.password = "Слишком лёгкий пароль";
            }
        },
        re_password: (value) => {
            if (!value) {
                errors.re_password = "Введите пароль";
            } else if (!isAuth && value !== values.password) {
                errors.re_password = "Пароли не совпадают";
            }
        }
    }
    Object.keys(values).forEach(key => result[key] && result[key](values[key]));
}