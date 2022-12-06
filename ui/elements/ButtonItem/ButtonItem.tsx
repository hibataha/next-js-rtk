interface IButtonItem {
  title: string;
  className: string;
  onHandleClick?: () => void;  
  disabled?: boolean;
}
export const ButtonItem = (props: IButtonItem) => {
  return <button type="submit" disabled={props.disabled} onClick={props.onHandleClick} className={props.className}>{props.title}</button>;
};
