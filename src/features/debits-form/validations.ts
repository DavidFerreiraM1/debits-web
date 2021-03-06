/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

export const debitFormValidation = Yup.object().shape({
  user: Yup.object().shape({
    label: Yup.string()
      .test('', 'O campo é obrigatório!', (value: any) => {
        return value;
      })
      .required('Campo obrigatório'),
  }),
  reason: Yup.string().required('Campo obrigatório!'),
  debitValue: Yup.string()
    .required('Campo Obrigatório!')
    .test(
      'Campo errado',
      'O Valor não poder ser igual a zero',
      (value: any) => {
        const val = value
          .trim()
          .replace('R$', '')
          .replaceAll('.', '')
          .replaceAll(',', '');
        const condition = parseFloat(val) === 0;
        return !condition;
      },
    ),
});
