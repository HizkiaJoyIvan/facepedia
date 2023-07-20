import ThumbUp from '@mui/icons-material/ThumbUp'
import Favorite from '@mui/icons-material/Favorite'

const Post: React.FC = () => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg my-5">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full w-9 h-9 mr-2"></div>
          <div className="">
            <div className="font-bold text-gray-700">Walter White</div>
            <div className="text-gray-400 font-md">2 hours ago</div>
          </div>
        </div>
        <p className="mb-5">
            Jesse, we need to cook
        </p>
        <div className='flex items-center gap-5'>
            <ThumbUp />
            <Favorite />
        </div>
      </div>
    )
  }

export default Post