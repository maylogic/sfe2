<template>
    <div class="grid sm:grid-cols-2 gap-2 mt-2 company-details-grid">
        <div>Название организации</div>
        <div>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ЦВИНГЕР АРТЕМ СЕРГЕЕВИЧ</div>
        <div>Юридический адрес организации</div>
        <div>650070, РОССИЯ, КЕМЕРОВСКАЯ ОБЛАСТЬ - КУЗБАСС, Г КЕМЕРОВО, УЛ ТУХАЧЕВСКОГО, Д 38Б, КВ 408</div>
        <div>ИНН</div>
        <div>425002264146</div>
        <div>ОГРН/ОГРНИП</div>
        <div>323420500034613</div>
        <div>Расчетный счет</div>
        <div>40802810000004571664</div>
        <div>Банк</div>
        <div>АО «ТБанк»</div>
        <div>ИНН банка</div>
        <div>7710140679</div>
        <div>БИК банка</div>
        <div>044525974</div>
        <div>Корреспондентский счет банка</div>
        <div>30101810145250000974</div>
        <div>Юридический адрес банка</div>
        <div>127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26</div>
    </div>
</template>
<style lang="scss">
.company-details-grid {
    div:nth-child(2n+1) {
        @apply mt-2 sm:mt-0;
    }
}
</style>