/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  TextField as MuiTextField,
} from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { useFormik } from 'formik';

import { formatMoney } from '../../utils/format-money';

import { getUsersService, postDebitService } from './service';
import { DebitsFormProps } from './interfaces';
import { debitFormValidation } from './validations';
import { styles } from './styles';
import { useDebitListContext } from '../debits-list/list-context';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewDebitContext = React.createContext<{
  newDebit: () => void;
  updateDebit: (id: string) => void;
}>({
  newDebit: () => {
    //
  },
  updateDebit: () => {
    //
  },
});

export function DebitsFormProvider(props: DebitsFormProps) {
  const classes = styles();
  const { children } = props;
  const { updateDebitList } = useDebitListContext();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<
    { label: string; value: number }[]
  >([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const getUsers = async () => {
      const { data } = await getUsersService();

      if (data && data.length > 0) {
        const opts = data.map(user => ({
          label: user.name,
          value: user?.id || 0,
        }));
        setOptions(opts);
      }
    };
    getUsers();
  }, []);

  const formik = useFormik({
    initialValues: {
      user: { label: '', value: 0 },
      reason: '',
      debitValue: 'R$ 0,00',
    },
    validationSchema: debitFormValidation,
    validateOnChange: false,
    onSubmit: (values: any) => {
      const postDebit = async () => {
        const { success } = await postDebitService({
          idUsuario: values.user.value,
          motivo: values.reason,
          valor: parseFloat(
            values.debitValue
              .toString()
              .trim()
              .replace('R$', '')
              .replaceAll('.', '')
              .replaceAll(',', '.'),
          ),
        });
        if (success) {
          updateDebitList();
          formik.resetForm();
          handleClose();
        }
      };
      postDebit();
    },
  });

  const newDebit = () => {
    handleClickOpen();
  };

  const updateDebit = () => {
    // console.log(id);
    // recebe id, busca os dados e preenche o form
    handleClickOpen();
  };

  return (
    <NewDebitContext.Provider
      value={{
        newDebit,
        updateDebit,
      }}
    >
      {children}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Editar Dados da Dívida
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.containerForm} maxWidth="md">
          {/* FORMULÁRIO */}
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputLabel>User</InputLabel>
                <AutoComplete
                  id="users"
                  options={options}
                  getOptionLabel={opt => opt.label}
                  getOptionSelected={(opt, val) => opt.value === val.value}
                  onChange={(event, param: any) => {
                    if (!param) {
                      formik.setValues({
                        ...formik.values,
                        user: { label: '', value: 0 },
                      });
                    } else {
                      formik.setValues({
                        ...formik.values,
                        user: { label: param.label, value: param.value },
                      });
                    }
                  }}
                  value={formik.values.user}
                  renderInput={params => (
                    <MuiTextField {...params} variant="outlined" fullWidth />
                  )}
                />
                <FormHelperText id="user-errors">
                  {formik.errors.user?.label}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Motivo</InputLabel>
                <MuiTextField
                  fullWidth
                  variant="outlined"
                  id="reason"
                  name="reason"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                />
                <FormHelperText id="reason-errors">
                  {formik.errors.reason}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Valor</InputLabel>
                <MuiTextField
                  fullWidth
                  variant="outlined"
                  id="debitValue"
                  name="debitValue"
                  value={formik.values.debitValue}
                  onChange={event =>
                    formik.setValues({
                      ...formik.values,
                      debitValue: formatMoney(event.target.value),
                    })
                  }
                />
                <FormHelperText id="debitValue-errors">
                  {formik.errors.debitValue}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.formBottom}>
                  <Box component="div" display="flex" justifyContent="flex-end">
                    <Box padding="0 8px">
                      <Button variant="outlined" onClick={handleClose}>
                        cancelar
                      </Button>
                    </Box>
                    <Box paddingLeft="8px">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => formik.handleSubmit()}
                      >
                        Atualizar
                        {/* { idDebitToUpdate ? 'Atualizar' : 'Concluir' } */}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
          {/* ========== */}
        </Container>
      </Dialog>
    </NewDebitContext.Provider>
  );
}

export const useDebitFormContext = () => {
  return React.useContext(NewDebitContext);
};
