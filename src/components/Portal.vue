<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ExternalLink, Earth, LockKeyhole, Signal, Github } from 'lucide-vue-next'
import useRouterOsData from '@/composables/router-os-data.ts'
// @ts-ignore
import { hexMD5 } from '@/utils/md5'
import { ref } from 'vue'


const { chapId, chapChallenge, linkLoginOnly, linkOrig } = useRouterOsData()


const pin = ref('')

const login = async () => {

  // const passMd5 = hexMD5(chapId.value + pin.value + chapChallenge.value)
  const passMd5 = hexMD5(chapId.value + '' + chapChallenge.value)
  window.location.href = `${linkLoginOnly.value}?username=${pin.value}&password=${passMd5}&dst=${linkOrig.value}&popup=false`

}

const openWP = () => {
  window.open('https://wa.me/59168093780', '_blank')
}
</script>

<template>
  <div
    class="h-full-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 p-4 space-y-6">
    <div class="w-full max-w-[340px] text-center relative">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <h1
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-teal-500 mb-2 relative">
        RAMOS-NET</h1>
      <p class="text-teal-300 text-sm relative">Bienvenido a nuestra red de alta velocidad</p>

    </div>
    <Card
      class="w-full max-w-[340px] bg-gray-900 text-gray-100 shadow-2xl border-indigo-800 overflow-hidden relative">
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      <CardHeader className="space-y-1 text-center pb-4">
        <!--        <div class="flex justify-center items-center space-x-2">-->
        <!--          <Wifi className="h-8 w-8 text-indigo-400" />-->
        <!--          <SignalHigh className="h-6 w-6 text-teal-500" />-->
        <!--        </div>-->
        <CardTitle className="text-xl font-bold text-indigo-300 pt-4">Conectar Ahora</CardTitle>
        <CardDescription className="text-teal-400 text-sm">
          Ingrese su PIN o código para conectarse a la red
        </CardDescription>
      </CardHeader>
      <CardContent>
        <!--        <Tabs defaultValue="login" className="w-full">-->
        <!--          <TabsList className="grid w-full grid-cols-2 mb-4">-->
        <!--            <TabsTrigger value="login">Conectar</TabsTrigger>-->
        <!--            <TabsTrigger value="register">Registrarse</TabsTrigger>-->
        <!--          </TabsList>-->
        <!--          <TabsContent value="login">-->
        <!--        <form onSubmit={handleSubmit} className="space-y-4">-->
        <div class="space-y-2">
          <!--          <Label htmlFor="pin" className="text-sm font-medium text-indigo-300">-->
          <!--            PIN / Código de Acceso-->
          <!--          </Label>-->
          <Input
            v-model="pin"
            placeholder="Ingrese su PIN o código"
            type="text"
            class="bg-gray-800 border-indigo-700 placeholder-indigo-500 text-indigo-100 rounded-3xl"
            required
          />
        </div>
        <Button class="w-full bg-indigo-600 hover:bg-indigo-500 text-indigo-100 py-2 rounded-3xl mt-5" @click="login">
          Conectar
        </Button>
        <!--        </form>-->
        <!--          </TabsContent>-->
        <!--          <TabsContent value="register">-->
        <!--            <form onSubmit={handleRegister} className="space-y-4">-->
        <!--              <div className="space-y-2">-->
        <!--                <Label htmlFor="email" className="text-sm font-medium text-indigo-300">-->
        <!--                  Correo Electrónico-->
        <!--                </Label>-->
        <!--                <Input-->
        <!--                  id="email"-->
        <!--                  placeholder="su@email.com"-->
        <!--                  type="email"-->
        <!--                  value={email}-->
        <!--                  onChange={(e) => setEmail(e.target.value)}-->
        <!--                className="bg-gray-800 border-indigo-700 placeholder-indigo-500 text-indigo-100"-->
        <!--                required-->
        <!--                />-->
        <!--              </div>-->
        <!--              <Button className="w-full bg-pink-600 hover:bg-pink-500 text-pink-100" type="submit">-->
        <!--                Registrarse-->
        <!--              </Button>-->
        <!--            </form>-->
        <!--          </TabsContent>-->
        <!--        </Tabs>-->
      </CardContent>
      <!--      <CardFooter class="flex flex-col items-center space-y-2 pt-0">-->
      <!--        <div class="flex items-center text-teal-400 text-xs">-->
      <!--          <Lock className="h-3 w-3 mr-1" />-->
      <!--                    <span>Conexión Segura</span>-->
      <!--        </div>-->
      <!--        <a href="#" class="text-pink-400 hover:text-pink-300 hover:underline text-xs flex items-center">-->
      <!--          &lt;!&ndash;          <Info className="h-3 w-3 mr-1" />&ndash;&gt;-->
      <!--          Términos y Condiciones-->
      <!--        </a>-->
      <!--      </CardFooter>-->
    </Card>

    <div class="w-full max-w-[340px] grid grid-cols-3 gap-4 mt-4">
      <Card class="bg-gray-900 text-gray-100 shadow-lg border-purple-800">
        <CardContent class="p-4 flex flex-col items-center">
          <Signal class="h-8 w-8 text-amber-400 mb-2" />
          <h3 class="text-xs font-semibold text-amber-300">Velocidad</h3>
          <p class="text-[10px] text-amber-400 text-center mt-1">Conexión rápida</p>
        </CardContent>
      </Card>
      <Card class="bg-gray-900 text-gray-100 shadow-lg border-purple-800">
        <CardContent class="p-4 flex flex-col items-center">
          <LockKeyhole class="h-8 w-8 text-cyan-400 mb-2" />
          <h3 class="text-xs font-semibold text-cyan-300">Seguro</h3>
          <p class="text-[10px] text-cyan-400 text-center mt-1">Navegación segura</p>
        </CardContent>
      </Card>
      <Card class="bg-gray-900 text-gray-100 shadow-lg border-purple-800">
        <CardContent class="p-4 flex flex-col items-center">
          <Earth class="h-8 w-8 text-indigo-300 mb-2" />
          <h3 class="text-xs font-semibold text-indigo-300">Ilimitado</h3>
          <p class="text-[10px] text-indigo-300 text-center mt-1">Internet ilimitado</p>
        </CardContent>
      </Card>
    </div>

    <Card className="w-full max-w-[340px] bg-gray-900 text-gray-100 shadow-lg border-purple-800 rounded-xl">
      <CardContent className="p-2">
        <div
          class="bg-gradient-to-br from-purple-900 to-indigo-900 p-2 rounded-lg text-center relative overflow-hidden">
          <div
            class="absolute top-0 right-0 w-16 h-16 bg-pink-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
          <h3 class="text-sm font-semibold mb-1 text-pink-300">¡Contactanos por whatsapp!</h3>
          <p class="text-2xl font-bold mb-2 text-indigo-300">68093780</p>
          <Button class="bg-pink-600 hover:bg-pink-500 text-pink-100 text-xs py-1 px-3 rounded-3xl h-auto"
                  @click="openWP"
          >
            Contactar
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!--    <div class="w-full max-w-[340px] grid grid-cols-3 gap-4 mt-4">-->
    <!--      <Button variant="outline" class="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">-->
    <!--&lt;!&ndash;        <UserPlus className="h-4 w-4 mr-2" />&ndash;&gt;-->
    <!--        Invitar-->
    <!--      </Button>-->
    <!--      <Button variant="outline" className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">-->
    <!--&lt;!&ndash;        <CreditCard className="h-4 w-4 mr-2" />&ndash;&gt;-->
    <!--        Comprar-->
    <!--      </Button>-->
    <!--      <Button variant="outline" className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">-->
    <!--&lt;!&ndash;        <Gift className="h-4 w-4 mr-2" />&ndash;&gt;-->
    <!--        Regalos-->
    <!--      </Button>-->
    <!--    </div>-->

    <!--    <div class="w-full max-w-[340px] flex justify-between items-center text-gray-400 text-xs mt-4">-->
    <!--      <div class="flex items-center">-->
    <!--        &lt;!&ndash;        <MapPin className="h-4 w-4 mr-1 text-teal-500" />&ndash;&gt;-->
    <!--        <span>Centro Comercial Plaza</span>-->
    <!--      </div>-->
    <!--      <div class="flex items-center">-->
    <!--        &lt;!&ndash;        <Globe className="h-4 w-4 mr-1 text-indigo-500" />&ndash;&gt;-->
    <!--        <span>ES | EN</span>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <Button variant="ghost" className="text-gray-300 hover:text-gray-200 text-xs">-->
    <!--      &lt;!&ndash;      <HelpCircle className="h-4 w-4 mr-1" />&ndash;&gt;-->
    <!--      Diseño por jjjjose-->
    <!--    </Button>-->
    <a href="https://github.com/jjjjose/mikrotik-hotspot-portal" target="_blank"
       class="text-gray-300 hover:text-gray-200 text-sm flex items-center">
      <Github class="h-3 w-4 mr-1" />
      Diseñado por jjjjose
    </a>
  </div>
</template>

<style scoped>
.h-full-screen {
  //height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);

}
</style>