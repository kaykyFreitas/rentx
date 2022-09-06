import { inject, injectable} from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICategories } from "@modules/cars/repositories/ICategories";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor( @inject("Categories") private repository: ICategories ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.repository.findByName(name);

        if(categoryAlreadyExists) {
            throw new AppError("Category alreay exists");
        }
    
        this.repository.create({ name, description });
    }
    
}

export { CreateCategoryUseCase };