import React, { useEffect, useState } from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';
import { useAuth } from '../auth/AuthContext';
import { useDebounce } from '../hooks/useDebounce';

const DynamicSearchForm = () => {
  const { isAuthenticated } = useAuth();
  const [formValues, setFormValues] = useState({ searchFields: [''] });

  // Debounce the form values for 500ms
  const debouncedSearchFields = useDebounce(formValues.searchFields, 500);

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      searchFields: debouncedSearchFields,
    }));
  }, [debouncedSearchFields]);

  useEffect(() => {
    console.log('Debounced Values:', debouncedSearchFields);
  }, [debouncedSearchFields]);

  return (
    <Formik
      initialValues={formValues}
      enableReinitialize
      onSubmit={(values) => {
        console.log('Submitted Values:', values);
      }}
      validateOnChange={true}
      validateOnBlur={false}
      validate={(values) => {
        setFormValues(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <FieldArray
            name="searchFields"
            render={(arrayHelpers) => (
              <div>
                {values.searchFields.map((_, index) => (
                  <div key={index}>
                    <Field
                      name={`searchFields[${index}]`}
                      as="input"
                      onChange={handleChange}
                    />
                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {isAuthenticated && (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    Add Field
                  </button>
                )}
              </div>
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicSearchForm;
