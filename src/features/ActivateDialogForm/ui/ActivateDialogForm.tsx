import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';

import { CustomInputWithButtons } from '@/shared/ui/CustomInputWithButtons/CustomInputWithButtons';
import { GratitudeDialog } from '@/widgets/GratitudeDialog/GratitudeDialog';

import classes from './ActivateDialogForm.module.scss';
import zIndex from "@mui/material/styles/zIndex";

interface IActivateDialogFormProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  buyPassHandler: () => void;
}

export const ActivateDialogForm: React.FC<IActivateDialogFormProps> = (props) => {
  const {
    isOpen,
    onClose,
    className = '',
    buyPassHandler
  } = props;

  const [ value, setValue ] = useState<string>( '1' );
  const [ isOpenDialog, setIsOpenDialog ] = useState<boolean>( false );

  const handleChangeValue = (newValue: string) => {
    setValue( newValue );
  };

  const handleCloseDialog = () => {
    setIsOpenDialog( false );
  };

  const onActivate = () => {
    buyPassHandler();
    onClose();
    setIsOpenDialog( true );
  };

  return (
    <>
      <Dialog  open={ isOpen } onClose={ onClose } className={ cn( classes.wrapper, {}, [ className ] ) }>
        <DialogTitle>
          Активация
        </DialogTitle>
        <DialogContent>
          <Box className={ classes.form }>
            <Box className={ classes.priceWrapper }>
              <Typography className={ classes.priceLabel }>Цена:</Typography>
              <Typography className={ classes.priceAmount }>3 TON</Typography>
            </Box>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant='contained' onClick={ onActivate }>Активировать</Button>
        </DialogActions>
      </Dialog>

      <GratitudeDialog isOpen={ isOpenDialog } onClose={ handleCloseDialog }/>
    </>
  );
};
