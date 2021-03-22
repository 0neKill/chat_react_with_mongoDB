export default (key, touched, errors) => {
    if (touched[key]) {
        return errors[key] ? 'error' : 'success';
    }
    return '';
}