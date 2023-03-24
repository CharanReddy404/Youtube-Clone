const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className='m-2 w-72 p-2 shadow-lg'>
      <img
        className='rounded-lg w-[100%]'
        alt='thumbnail'
        src={thumbnails.medium.url}
      />
      <ul>
        <li className='font-bold py-2'>{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
