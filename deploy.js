import fs from 'fs';
import path from 'path';
import mime from 'mime-types'; // Для определения MIME-типов
import AWS from 'aws-sdk';

// Настройка AWS SDK
// Секреты не хранятся в репозитории: ключи берутся из окружения.
const requireEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        console.error(`Не задана переменная окружения ${name}. Пример: ${name}=... node deploy.js`);
        process.exit(1);
    }
    return value;
};

AWS.config.update({
    accessKeyId: requireEnv('YANDEX_S3_ACCESS_KEY'),
    secretAccessKey: requireEnv('YANDEX_S3_SECRET_KEY'),
    region: 'ru-central1',
    endpoint: process.env.YANDEX_S3_ENDPOINT || 'https://storage.yandexcloud.net'
});

const s3 = new AWS.S3();

// Параметры
const bucketName = requireEnv('YANDEX_S3_BUCKET');
const localDirectory = './.output/public'; // Локальная директория с файлами

// Рекурсивная загрузка файлов
function uploadDirectoryToS3(localDir, s3Path) {
    const files = fs.readdirSync(localDir);

    files.forEach((file) => {
        const filePath = path.join(localDir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // Если это директория, рекурсивно обрабатываем её
            uploadDirectoryToS3(filePath, `${s3Path}${file}/`);
        } else {
            // Если это файл, загружаем его в S3
            const mimeType = mime.lookup(filePath) || 'application/octet-stream'; // Определяем MIME-тип
            const fileContent = fs.readFileSync(filePath);

            const params = {
                Bucket: bucketName,
                Key: `${s3Path}${file}`, // Путь к файлу в S3
                Body: fileContent,
                ContentType: mimeType // Устанавливаем правильный Content-Type
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    console.error(`Ошибка при загрузке файла ${filePath}:`, err);
                } else {
                    console.log(`Файл успешно загружен: ${data.Location}`);
                }
            });
        }
    });
}

// Запуск загрузки
uploadDirectoryToS3(localDirectory, '');