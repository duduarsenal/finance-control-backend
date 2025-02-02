import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@': `${__dirname}`,
  '@controllers': `${__dirname}/controller`,
  '@services': `${__dirname}/service`,
  '@business': `${__dirname}/business`,
  '@repositorys': `${__dirname}/repository`,
  '@routes': `${__dirname}/routes`,
  '@middlewares': `${__dirname}/middleware`,
  '@configs': `${__dirname}/config`,
  '@enums': `${__dirname}/utils/enum.js`,
  '@errors': `${__dirname}/utils/error.js`
});