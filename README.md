###TEST TASK
Тестовое задание:

Суть: сделать страничку на которой будет 3 выпадающих списка с сохранением выбранных значений в url

1. Реализуйте 3 выпадающих списка, значения которых загружаются из API и не кэшируются
- Услуги - api/test/v1/search/terms
- Бренды - api/test/v1/search/brands_terms
- Стили - api/test/v1/search/styles

2. При выборе значения из списка обновляйте URL страницы сохраняя выбранные значения
/s-{service_slug}/ - для услуг
/b-{brand_slug}/ - для брендов
/st-{style_slug}/ - для стилей

Пример URL когда выбраны все 3 значения в выпадающих списках http://localhost:3000/s-zamina-zcheplennia/b-daihatsu/st-modern

3. При обновлении страницы отображение выбранных значений выпадающих списков не должны пропадать

- Получение значений для выпадающих списков - api/test/v1/search/parse_link


~ 50 минут Вам потребуется на решение

Документация swagger - https://beta.autobooking.com/api-docs/index.html?urls.primaryName=Test API V1 Docs
