import PropTypes from 'prop-types';

import './city-form.css';

export default function CityForm({
    onSubmit,
    onCancel,
}) {
    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const input = form.elements[0];
        const value = input.value.trim();
        input.value = '';
        onSubmit(value);
    }

    return (
        <form
            className="city-form"
            onSubmit={handleFormSubmit}
        >
            <input
                className="city-form__input"
                placeholder="Stadt eingeben"
                onBlur={onCancel}
                autoFocus
            />
        </form>
    );
}

CityForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
