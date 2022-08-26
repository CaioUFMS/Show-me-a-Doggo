import styles from '../styles/Home.module.css'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import initImage from '../public/startImage.png'
import Radiobutton from '../components/radiobutton.js'
import Button from '../components/button.js'

function Home() {

  //Declaração dos useStates
  const [currentImage, setCurrentImage] = useState(initImage);
  const [currentWidth, setCurrentWidth] = useState(650);
  const [currentHeight, setCurrentHeight] = useState(366)
  const [currentBreedText, setCurrentBreedText] = useState('Click the doggo or the button to start')
  const [currentImageType, setCurrentImageType] = useState('jpg,png,gif');

  return (
    
    <div className={styles.main}>
      <title>
        Show me a Doggo
      </title>
      
      <h1 className={styles.title}>
        Show me a Doggo 
      </h1>

      <div className = {styles.center}>
        <div className = {styles.imageDisplay}>
          {/*Usando o componente "Image" nativo do Next.js
          o clique na imagem ativa a requisição de uma nova*/}
          <div className={styles.imageBorder}>
          <Image 
            src = {currentImage}
            alt = 'Here is where the doggo should be'
            width={currentWidth}
            height={currentHeight}
            onClick={doggoRequest}
            objectFit='cover'
          />
          </div>
        </div>

        {/*Usando o componente "RadioButton" customizado,
        ao selecionar uma opção as imagens mostradas serão daquele tipo até que a seleção seja alterada*/}
        <div className = {styles.form}>
          <Radiobutton 
          formTitle = 'In what format do you want to see doggos?'
          optionValue = {['gif', 'jpg,png', 'jpg,png,gif']}
          optionText = {['GIF', 'Static Image', 'Any Format']}
          onChangeOp = {setCurrentImageType.bind(this)}
          currentSelectedValue = {currentImageType}>
          </Radiobutton>

          {/*É mostrada a raça do cachorro ou uma mensagem quando não foi enviada informação sobre raça pela API*/}
          <div>
            <h3 className = {styles.breedText}>
              {currentBreedText}
            </h3>
          </div>


          {/*Usando o componente "Button" customizado, semelhante ao feito em aula
          o clique no botão ativa a requisição de uma nova imagem*/}
          <Button onClick={doggoRequest} rounded = {true}>Get a new Doggo</Button>
        </div>
      </div>


    </div>

    
  )

  //Função que realiza a requisição para a API e atualiza os useStates
  //afim de que os componentes relevantes sejam atualizados
  async function doggoRequest(){

    //Define a chave da API no header da requisição
    axios.defaults.headers.common['x-api-key'] = "fc005c6b-ebd3-48ee-b97e-a593cd74eac8"

    //Requisição para a api com os parâmetros necessários
    const res = await axios.get('https://api.thedogapi.com/v1/images/search', { params: { limit:1, size:"full", mime_types: currentImageType}})

    //Como o componente Image pede a definição explicita de width e height para imagens externas
    //O método define as propriedades, garantindo que as imagens manterão seu aspect ratio quando possível

    setCurrentWidth(res.data[0].width);

    setCurrentHeight(res.data[0].height);

    //Define a URL da imagem atual
    setCurrentImage(res.data[0].url)

    //Define o texto com a raça do cachorro ou a mensagem de que não houve informação disponível
    if(res.data[0].breeds.length > 0){
      setCurrentBreedText('This breed is called ' + res.data[0].breeds[0].name)
    }else{
      setCurrentBreedText('No breed info was returned')
    }
    
  }
}

export default Home;