import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';

function Component({ children, form, onSubmit, onError, id }) {
  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit, onError)} id={id}>
        {children}
      </Form>
    </FormProvider>
  );
}

const Form = styled.form`
  width: 100%;

  & > * {
    margin-bottom: 24px;
  }
`;

export default Component;
