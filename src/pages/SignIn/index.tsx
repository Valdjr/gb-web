import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Content, Background } from './styles';
import getValidationError from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup.string().required('E-mail obrigatório'),
          password: yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationError(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="criar">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
