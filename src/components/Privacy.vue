<template>
  <v-sheet v-show="show" border="md" class="pa-6 text-white mx-auto position" color="background" max-width="400">
    <h4 class="text-h5 font-weight-bold mb-4"> PRIVOLA ZA OBRADU OSOBNIH PODATAKA </h4>

    <p class="mb-8">
      Svojom privolom dopuštam prikupljanje, obradu i pohranu mojih osobnih podataka u svrhu korištenja aplikacije
      ePrometna. Svi podaci koje unosim (ime, prezime, OIB, datum rođenja, adresa, email, lozinka, uloga, vozačka
      dozvola, uređaji) koristit će se isključivo za potrebe funkcioniranja aplikacije, pružanja usluga i ispunjavanja
      zakonskih obveza.
      Podaci neće biti proslijeđeni trećim osobama bez mog izričitog pristanka, osim ako je to nužno radi ispunjavanja
      zakonskih obveza ili zahtjeva nadležnih tijela.
      Upoznat/a sam s pravom na pristup svojim podacima, ispravak, brisanje, ograničenje obrade, prijenos podataka i
      povlačenje privole u bilo kojem trenutku, bez negativnih posljedica za korištenje aplikacije, osim onih koje
      proizlaze iz zakonskih obveza.
      Privolu dajem dobrovoljno i svjestan/na sam da je mogu povući u bilo kojem trenutku slanjem zahtjeva putem
      aplikacije ili na službenu email adresu voditelja obrade.
    </p>

    <v-btn @click="accept" class="text-none text-black mb-4" color="primary" size="x-large" variant="flat" block>
      Prihvati
    </v-btn>

    <v-btn @click="decline" class="text-none text-black" color="error" size="x-large" variant="outlined" block>
      Odbj
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'

const cname = "TOS_ACCEPTED"
defineProps({
  accepted: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['update:accepted'])

// God forgive me for this abomination
const checkCookie = (): boolean => {
  const val = Cookies.get(cname)
  const ret = val == "true"
  emit('update:accepted', ret)
  return ret
}

const show = ref<boolean>(!checkCookie())

const accept = () => {
  Cookies.set(cname, "true", { secure: true, sameSite: 'strict', expires: 365 })
  emit('update:accepted', true)
  show.value = false
}

const decline = () => {
  Cookies.remove(cname)
  emit('update:accepted', false)
  show.value = false
}

const ShowTos = () => {
  show.value = true
}

defineExpose({
  ShowTos
})
</script>

<style lang="css" scoped>
.position {
  position: absolute;
  right: 15px;
  bottom: 55px;
}
</style>
