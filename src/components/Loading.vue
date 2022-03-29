<template>
    <v-fade-transition hide-on-leave>
        <v-card
            flat
            v-if="show"
            class="text-center mt-16"
        >
            <v-progress-circular
                indeterminate
                size="100"
                width="15"
            ></v-progress-circular>
            <v-card-title>
                <div
                    class="text-center"
                    style="width: 100%"
                >
                    {{ text }}
                </div>
            </v-card-title>
        </v-card>
    </v-fade-transition>
</template>

<script>
export default {
    name: 'Loading',
    props: ['show', 'text']
}
</script>
