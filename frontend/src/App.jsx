import './App.css'

function App() {

  return (
    <>
      <Text display="Yash" count="3"/>
      <Text display="Kevin" count="4"/>
    </>
  )
}

const Text = ({display}) => {
  return (
    <p>{display}</p>
  )
}

export default App
