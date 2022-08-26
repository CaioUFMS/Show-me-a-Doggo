import styles from '../styles/Button.module.css'
{/*Componente que passa as propriedades recebidas para um objeto button.
O componente já realiza a customização do botão de acordo com o padrão do site.
Propriedades manipuladas pelo componente:
(Opcional) rounded: se existir, arredonda o botão com bordas de 5px
Feito para fins de reuso de código bem como a fim de facilitar a coesão entre elementos da página em caso de
implementação de novas funções dependentes de botão*/}
export default function(props){

  let classes = styles.button + ' ' + styles.colors;
  if (props.rounded === true) classes += ' ' + styles.rounded;
  
  return <button {...props} className = {classes}>{props.children}
  </button>;
}