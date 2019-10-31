import { News } from './news.entity';
import { Image } from "../Images/image.entity";

export const newsProvider = {
    provide: 'NewsRepository',
    useValue: News
};
export const imageProvider = {
    provide: 'ImageRepository',
    useValue: Image
};