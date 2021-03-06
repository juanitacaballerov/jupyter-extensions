import { Dialog } from '@material-ui/core';
import * as csstips from 'csstips';
import * as React from 'react';
import { stylesheet } from 'typestyle';
import { BASE_FONT, COLORS } from '../styles';
import { ActionBar } from './action_bar';
import { SubmitButton } from './submit_button';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  header?: string;
  open: boolean;
  onClose?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  submitDisabled?: boolean;
  hideSubmit?: boolean;
  keepMounted?: boolean;
  height?: string;
}

const dialogStyle = stylesheet({
  header: {
    ...BASE_FONT,
    fontWeight: 500,
    fontSize: '15px',
    margin: '16px 16px 0 16px',
    ...csstips.horizontal,
    ...csstips.center,
  },
  main: {
    backgroundColor: COLORS.white,
    color: COLORS.base,
    padding: '16px',
    width: '480px',
    ...BASE_FONT,
    ...csstips.vertical,
  },
});

function getPaper(height: string) {
  let classes = null;
  if (height) {
    classes = makeStyles({
      paper: {
        minHeight: height,
      },
    });
    return classes().paper;
  }
  return null;
}

/** Funtional Component for a common dialog interface with cancel and submit buttons. */
export function DialogComponent(props: Props) {
  return (
    <Dialog
      keepMounted={props.keepMounted}
      open={props.open}
      classes={{ paper: getPaper(props.height) }}
    >
      {props.header && (
        <header className={dialogStyle.header}>{props.header}</header>
      )}
      {props.children && (
        <main className={dialogStyle.main}>{props.children}</main>
      )}
      <ActionBar
        onClick={props.onCancel}
        closeLabel={props.cancelLabel || 'Cancel'}
      >
        {!(props.hideSubmit || false) && (
          <SubmitButton
            actionPending={props.submitDisabled || false}
            onClick={props.onSubmit}
            text={props.submitLabel || 'Submit'}
          />
        )}
      </ActionBar>
    </Dialog>
  );
}
