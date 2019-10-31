import { Image } from './image.entity';

export const imageProvider = {
    provide: 'ImageRepository',
    useValue: Image
};