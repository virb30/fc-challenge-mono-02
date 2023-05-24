import { Sequelize } from "sequelize-typescript";
import path from 'path';
import { glob } from 'glob';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ":memory:",
    logging: false,
});


export async function addModels() {

    const srcDir = path.join(__dirname, '..', '..');
    const modelFiles = path.join(srcDir, 'modules', '*/**/*.model.ts');

    const files = await glob(modelFiles);

    const models = await Promise.all(
        files.map(async (path) => {
            const importedModel = await import(path);
            return importedModel.default;
        })
    );

    sequelize.addModels(models);
}