import Button from './Button';

const List = [
  'All',
  'Gaming',
  'React',
  'Songs',
  'BGMI',
  'Cooking',
  'Fighting',
  'Anime',
  'Funny',
];

const ButtonList = () => {
  return (
    <div className='flex'>
      {List.map((name, i) => {
        return <Button key={i} name={name} />;
      })}
    </div>
  );
};

export default ButtonList;
