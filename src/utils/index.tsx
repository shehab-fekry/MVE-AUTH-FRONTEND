// backgorund words generator
export const generateBackgroundWords = (word: string) => {
  return Array.from({ length: 5 }).map((_, x) => {
    return Array.from({ length: 5 }).map((_, y) => {
      return (
        <p
          className='noselect -z-1 -bg-conic-0 text-[70px] text-black/5'
          key={x + '' + y}
          style={{
            position: 'absolute',
            top: `${y * 185}px`,
            left: `${x * 400}px`,
          }}
        >
          {word}
        </p>
      );
    });
  });
};
