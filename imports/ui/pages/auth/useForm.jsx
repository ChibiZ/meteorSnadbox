import React from 'react';

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = React.useState(initialState);
  const [errors, setErrors] = React.useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'password' || name === 'repeatPassword') {
      const compareWith = name === 'password' ? 'repeatPassword' : 'password';

      if (formData[compareWith] !== value) {
        setErrors({ repeatPassword: 'Пароли не совпадают' });
      } else if (errors?.repeatPassword) {
        setErrors({ repeatPassword: null });
      }
    }

    // if (name === 'repeatPassword') {
    //   if (formData.password !== value) {
    //     setErrors({ repeatPassword: 'Пароли не совпадают' });
    //   } else if (!errors?.password) {
    //     setErrors({ repeatPassword: null });
    //   }
    // }
    setFormData({ ...formData, [name]: value });
  };

  const isValid = React.useMemo(
    () =>
      errors ? Object.values(errors).every((value) => value == null) : true,
    [errors],
  );

  return { formData, handleInputChange, errors, isValid };
};
