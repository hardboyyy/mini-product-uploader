import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'

const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
]

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className='text-center text-4xl font-bold uppercase text-gray-900 sm:text-5xl lg:text-6xl'>
          Mini product uploader 
        </div>
      </div>
    </div>
  )
}

export default App
