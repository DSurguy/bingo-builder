import { getRandomIntInclusive } from './utils/random';

const seed = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis fermentum semper. Sed sit amet egestas mauris, eu tincidunt libero. In in erat vitae lectus venenatis sollicitudin. Nullam pellentesque tellus a magna ultricies, ac tempor leo ultrices. Ut sit amet nibh iaculis justo lobortis finibus bibendum sit amet tellus. In id bibendum massa. Proin quis consectetur diam. Ut porttitor tortor a orci vestibulum congue eu ut ipsum. Integer egestas a arcu sed iaculis. Nullam lacinia euismod ligula ac sagittis. Nullam et erat sed nisi placerat consequat ut quis erat. Ut at purus cursus, suscipit lacus in, aliquam arcu.

Sed eu tellus bibendum, laoreet orci ultrices, malesuada libero. Maecenas bibendum, tortor quis efficitur dapibus, ex quam facilisis felis, id mollis metus nunc ac ligula. Nam quis est consectetur, rutrum ipsum sit amet, sollicitudin urna. Etiam vulputate vestibulum ante quis dignissim. Fusce at bibendum velit. Vivamus eu vestibulum purus. Quisque est est, eleifend quis tempor fermentum, convallis non metus. Nullam in gravida velit.

Curabitur eu nisl sem. Nam diam dolor, tempus vitae massa at, placerat malesuada magna. Ut aliquam nec quam non tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non lectus eget tellus consectetur luctus a ut justo. Vestibulum semper neque felis, ut cursus mauris malesuada at. Sed ut tortor et justo dignissim ultrices nec nec leo.

Vivamus at est aliquet, congue mi eget, accumsan velit. Mauris tristique ac nulla ac ultricies. Sed nec molestie neque, et tincidunt elit. Nulla scelerisque nisl est, ac hendrerit libero vehicula at. Nunc in arcu vestibulum, facilisis velit ut, venenatis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed est ligula, consectetur nec rutrum ac, eleifend ac urna.

Etiam ultricies dapibus felis efficitur volutpat. Donec finibus metus sed consectetur fringilla. Vivamus quis mauris elit. Integer pretium enim tortor, non ultrices elit viverra ac. Fusce dolor risus, auctor eget enim vitae, dignissim facilisis libero. Mauris ac tellus fermentum, pretium sapien non, viverra dui. Nulla nec malesuada lacus.

Donec pulvinar metus eget pulvinar laoreet. Pellentesque sagittis molestie tortor, vitae viverra dolor ornare non. Vivamus ut ipsum venenatis tortor ultricies vehicula. Nunc ornare purus ut purus semper, quis malesuada quam tincidunt. Aliquam maximus, leo id ullamcorper aliquam, lectus odio iaculis leo, ac consequat risus orci non quam. Sed sit amet metus nec diam pharetra blandit sit amet non purus. Vestibulum eu leo luctus dui condimentum feugiat. Nam at enim consectetur, efficitur nisi in, tincidunt lorem. Curabitur eu volutpat dolor, laoreet tristique arcu. Nulla elementum tempor scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Suspendisse lobortis nisl quis magna eleifend sodales. Fusce rhoncus enim id leo ultricies, vel pharetra purus pharetra.

Nulla facilisi. Vivamus commodo tortor massa, et ullamcorper felis aliquam luctus. Curabitur placerat auctor luctus. Morbi eros enim, viverra sed tristique vel, cursus quis nulla. Sed imperdiet laoreet ultricies. Quisque ac iaculis lorem, eu maximus odio. In hac habitasse platea dictumst. Praesent sodales nibh nisi, ac elementum dolor interdum a. Aliquam.
`;

export const words = seed.replace(/[^\d\w\s]/g, '').replace(/\s/g, ' ').split(/\s/).filter(word => word);

export const getSeedLines = (numLines: number) => new Array(numLines).fill("").map(() => {
  const numberOfWords = getRandomIntInclusive(1, 8);
  return new Array(numberOfWords).fill("").map(() => words[getRandomIntInclusive(0, words.length - 1)]).join(' ');
}).join("\n");