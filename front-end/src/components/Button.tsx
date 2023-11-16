const Button = (props: { word?: string; handler?: any }) => {
  const { word, handler } = props

  const showFormHandler = () => {
    handler()
  }
  return (
    <button
      className='w-full h-8 bg-slate-900 rounded-lg hover:bg-slate-700'
      onClick={showFormHandler}>
      {word}
    </button>
  )
}
export default Button
