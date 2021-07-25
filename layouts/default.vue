<template>
  <div>
    <nav
      class="navbar header has-shadow is-success"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="ml-2 p-2 is-size-4 has-text-white" href="/" title="ค้นหาแลปตรวจโควิด">
          ระบบค้นหาแลปตรวจโควิด
        </a>
      </div>
    </nav>

    <section class="">
        <Nuxt />
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
          <small>
            ระบบค้นหาแลปตรวจโควิด รวบรวม <a target="_blank" href="#" title="ข้อมูลอ้างอิง">ข้อมูลจากหลายแหล่ง</a> โดยเหล่าอาสาสมัคร กรุณาตรวจสอบกับแลปก่อนเข้ารับบริการ 
          </small><br>
          <small>
            ข้อมูลในเว็บไซต์นี้เปิดเป็น api นักพัฒนาสามารถนำไปพัฒนาต่อยอดได้ <a title="Covid lab data" href="https://covid-lab-data.pages.dev/">Covid lab data</a>
          </small>
      </div>
</footer>

  </div>
</template>

<style scoped>
.footer{
  padding: 1.5rem;
}
</style>