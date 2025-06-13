import {writeFileSync} from 'fs';
import {join} from 'path';
import favicons from 'favicons';

const source = 'public/favicon.svg'; // Путь к исходному SVG
const destination = 'public'; // Куда сохранить иконки

const configuration = {
    appName: 'Safepets',
    appShortName: 'Safepets',
    appDescription: 'Safepets - товары для животных',
    developerName: 'Safepets',
    developerURL: 'https://safepets.ru',
    dir: 'auto',
    lang: 'ru-RU',
    background: '#fff',
    theme_color: '#fff',
    appleStatusBarStyle: 'black-translucent',
    display: 'standalone',
    orientation: 'any',
    scope: '/',
    start_url: '/',
    version: '1.0',
    logging: false,
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
        yandex: true
    }
};

favicons(source, configuration).then(function (response) {
    for (const file in response.files) {
    }

    response.files.forEach(file => {
        const filePath = join(destination, file.name);
        writeFileSync(filePath, file.contents);
    })

    response.images.forEach(image => {
        const imagePath = join(destination, image.name);
        writeFileSync(imagePath, image.contents);
    })

    writeFileSync(join(destination, 'favicon.html'), response.html.join('\n'));
    console.log('✅ Favicons успешно сгенерированы!');
}).catch((error) => {
    console.error(error);
});