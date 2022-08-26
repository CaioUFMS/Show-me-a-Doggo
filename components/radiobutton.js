{/*Este componente utiliza as propriedades:
optionText[]: Um array de strings com o texto desejado para cada opção(O array deve ter um numero de elementos igual a "numberOfOptions");
(Opcional)currentSelectedValue: Valor (useState) atual, será a opção selecionada ao gerar o form
*Se não for informado o valor selecionado, nenhuma opção começará marcada*
(Opcional) optionValue[]: Um array de strings com o "value" desejado para cada opção(O array deve ter um numero de elementos igual a "numberOfOptions";
*Se não houver um array optionValue[] os values serão iguais ao texto da opção*
*Todos os valores são combinados por ordem ex: A primeira opção, recebe o primeiro texto e o primeiro value dos respectivos arrays*
(Opcional) onChangeOp: função desejada para a operação onChange que será executada passando o "value" da opção escolhida como paramtero.
(Opcional) formTitle: define o titulo/texto mostrado acima das opções*/}

import styles from '../styles/RadioButton.module.css'

export default function(props){

    if(props.optionText !== undefined){
      const options = []
    
      if(props.optionValue !== undefined && props.optionValue.length === props.optionText.length){
        for(let i = 0; i < props.optionText.length; i++){
          options.push(
          <div className="form-check" key={i}>
            <label>
              <input 
                type="radio"
                name="react-tips"
                value={props.optionValue[i]}
                className="form-check-input"
                defaultChecked={props.optionValue[i] === props.currentSelectedValue}
              />
              {props.optionText[i]}
            </label>
          </div>
          )
        }
      }else {
        for(let i = 0; i < props.optionText.length; i++){
          options.push(
          <div className="form-check" key={i}>
            <label>
              <input 
                type="radio"
                name="react-tips"
                value={props.optionText[i]}
                className="form-check-input"
                defaultChecked={props.optionText[i] === props.currentSelectedValue}
              />
              {props.optionText[i]}
            </label>
          </div>
          )
        }
      }
    

      return (
      <div>
        <p className={styles.title}>{props.formTitle}</p>
        <form 
          className={styles.buttonStyle}
          onChange = {(event) => props.onChangeOp(event.target.value)}>
          {options}
        </form>
      </div>
      )
    }

  console.log('Erro ao tentar criar Radio Button, por favor verifique as propriedades necessárias');
}