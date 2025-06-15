<template>
    <div class="homepage-perks">
        <u-container>
            <div class="perks-list">
                <div class="fast-delivery">
                    <loadable-image src="/perks/Fast-Shipping-Individual-Icon.png" alt="Быстрая доставка">
                        <div class="image-placeholder w-[72px] h-[72px]"></div>
                    </loadable-image>
                    <span>Быстрая доставка</span>
                </div>
                <div class="personalized">
                    <loadable-image src="/perks/Personalised-Individual-Icon.png"
                                    alt="Персонализируйте под вашего хвостика">
                        <div class="image-placeholder w-[72px] h-[72px]"></div>
                    </loadable-image>
                    <span>Персонализируйте под вашего хвостика</span>
                </div>
                <div class="lightweight">
                    <loadable-image src="/perks/Light-Weight-Individual-Icon.png" alt="Легкий как пушинка">
                        <div class="image-placeholder w-[72px] h-[72px]"></div>
                    </loadable-image>
                    <span>Легкий как пушинка</span>
                </div>
                <div class="happiness">
                    <loadable-image src="/perks/Happiness-Guaranteed-Individual-Icon.png" alt="Радость гарантирована!">
                        <div class="image-placeholder w-[72px] h-[72px]"></div>
                    </loadable-image>
                    <span>Радость гарантирована!</span>
                </div>
                <div class="made-to-last">
                    <loadable-image src="/perks/Made-To-Last-Individual-Icon.png" alt="Не гремит">
                        <div class="image-placeholder w-[72px] h-[72px]"></div>
                    </loadable-image>
                    <span>Металлический, но не гремит</span>
                </div>
                <div class="easy-order">
                    <loadable-image src="/perks/Easy-Online-Ordering-Individual-Icon.png"
                                    alt="Легкий заказ в онлайн-конструкторе">
                        <div class="image-placeholder w-[72px] h-[72px]"></div>
                    </loadable-image>
                    <span>Легкий онлайн заказ в конструкторе</span>
                </div>
            </div>
        </u-container>
    </div>
</template>
<style lang="scss">
.homepage-perks {
    @apply bg-black text-white font-black text-center;
    font-family: "Fira Sans", sans-serif;

    .perks-list {
        @apply flex items-start w-full gap-2 md:justify-between overflow-x-auto md:overflow-x-hidden;
        @apply py-8;
        & > div {
            @apply w-36 flex flex-col gap-2 items-center leading-5 uppercase flex-shrink-0 flex-grow-0;
            img.loaded {
                @apply w-[72px] h-[72px];
            }
        }
    }
}
</style>