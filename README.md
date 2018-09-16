Документация [VK Apps платформы](https://vk.com/dev/vk_apps_docs).
Это fork примера https://github.com/tsivarev/currency
## Доступные команды

### `npm start`
Приложение запустится в dev режиме.
Откройте [http://localhost:10888](http://localhost:10888) в вашем браузере.

### `npm run build`
Собрать production версию приложения.

Не забудьте поменять homepage в package.json на актуальную
Не забудьте поменять appId в src/store/vk/actions на актуальную (если будете использовать)


###TODO

Починить ошибку "Failed to minify the code from this file:./node_modules/rss-parser/lib/parser.js:16" при билде
Добавить прогресс-бар пока загружается контент https://vkcom.github.io/vkui-styleguide/#progress
Сохранять айди подписывающихся людей куда-то
