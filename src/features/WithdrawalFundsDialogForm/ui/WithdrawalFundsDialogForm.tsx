import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';

import { CustomInputWithButtons } from '@/shared/ui/CustomInputWithButtons/CustomInputWithButtons';

import classes from './WithdrawalFundsDialogForm.module.scss';

interface IWithdrawalFundsDialogFormProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  balance: number;
  handleWidth: (amount:number) => void;
}

export const WithdrawalFundsDialogForm: React.FC<IWithdrawalFundsDialogFormProps> = (props) => {
  const {
    className = '',
    isOpen,
    onClose,
    handleWidth,
    balance
  } = props;

  const [ value, setValue ] = useState<string>( '1' );

  const handleChangeValue = (newValue: string) => {
    if(newValue < '1'){
      return setValue( '1');
    }

    if(+newValue > balance/1e9){
      return setValue( '' + (balance/1e9) );
    }
    setValue( newValue );
  };

  return (
    <Dialog open={ isOpen } onClose={ onClose } className={ cn( classes.wrapper, {}, [ className ] ) }>
      <DialogTitle>
        Вывод
      </DialogTitle>
      <DialogContent>
        <Box className={ classes.form }>
          <CustomInputWithButtons value={ value } onChange={ handleChangeValue }/>
          <Typography className={ classes.tonLabel }>TON</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button fullWidth variant='contained' onClick={ () => {
          handleWidth(+value);
        } }>Вывести</Button>
      </DialogActions>
    </Dialog>
  );
};
