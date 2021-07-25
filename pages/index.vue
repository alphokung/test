<template>
  <section style="padding: 1rem;">
    <div v-if="isLoading === true">
      Loading...
    </div>
    <div v-else>
      <div class="card">
        <div class="card-content">
          <b-field>
            <b-input
              v-model="search"
              placeholder="กรอกชื่อแลป หรือรหัสไปรษณีย์ หรืออำเภอ หรือจังหวัด ที่ต้องการค้นหา..."
              type="search"
              icon="magnify"
            >
            </b-input>
          </b-field>
            <b-field>
              <b-checkbox v-model="rt" > RT-PCR </b-checkbox>
              <b-checkbox v-model="at" > Antigen Test </b-checkbox>
              <b-checkbox v-model="ftf" > Fit to fly </b-checkbox>

              <b-checkbox v-model="dt" > รองรับ Drive Thru </b-checkbox>
              <b-checkbox v-model="wi" > รองรับ Walk in </b-checkbox>
            </b-field>


          <div class="mb-2">
            <small
              >สามารถแนะนำแลปเพิ่มเติมได้ที่
              <a
                title="แนะนำแลปเพิ่มเติม"
                target="_blank"
                href="https://bit.ly/covid-lab-form"
                >แนะนำแลปเพิ่มเติม</a
              >
             </small>
            <div class="mt-2">
              <small class="has-text-danger"
                >* กรุณาติดต่อแลปก่อนเข้ารับการตรวจ ข้อมูลอาจเปลี่ยนแปลงได้ตลอดเวลา
                </small
              >
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-4">
        <div class="card-content">
          <b-select v-model="perPage" class="mb-4">
            <option value="25">25 รายการต่อหน้า</option>
            <option value="50">50 รายการต่อหน้า</option>
            <option value="200">200 รายการต่อหน้า</option>
            <option value="100000">ทั้งหมด</option>
          </b-select>

          <b-table
            :paginated="true"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :data="filterData"
            :bordered="false"
            :mobile-cards="true"
          >
            <b-table-column
              field="n"
              label="ชื่อ"
              v-slot="props"
              cell-class="ignore-label"
            >
              <div style="min-width:100%">
                <span v-if="props.row.pp == 'pu'"
                  >{{ props.row.n }} (รัฐบาล)</span
                >
                <span v-else-if="props.row.pp == 'v'"
                  >{{ props.row.n }} (เอกชน)</span
                >
                <span v-else>{{ props.row.n }}</span>
              </div>
            </b-table-column>
            <b-table-column
              field="lt"
              label="ประเภทการตรวจ"
              v-slot="props"
              cell-class="ignore-label"
            >
              <div style="min-width:100%">
                <span
                  v-if="props.row.rt"
                  class="tag is-success is-small mt-1 mr-1"
                  >RT PCR</span
                >
                <span v-if="props.row.at" class="tag is-info is-small mt-1 mr-1"
                  >Antigen Test</span
                >
                <span
                  v-if="props.row.ftf"
                  class="tag is-link is-small mt-1 mr-1"
                  >Fit to fly</span
                >
                <span
                  v-if="props.row.dt"
                  class="tag is-success is-small mt-1 mr-1"
                  >รับ Drive Thru</span
                >
                <span
                  v-if="props.row.wi"
                  class="tag is-success is-small mt-1 mr-1"
                  >รับ Walk In</span
                >
              </div>
            </b-table-column>
            <b-table-column
              field="adr"
              label="ที่อยู่"
              v-slot="props"
              cell-class="ignore-label"
            >
              <div v-if="props.row.adr !== '' && props.row.adr !== undefined">
                <span v-html="props.row.adr"></span>
              </div>
            </b-table-column>
            <b-table-column field="p" label="จังหวัด" v-slot="props">
              {{ props.row.p }}
            </b-table-column>
            <b-table-column
              field="mob"
              label="ติดต่อ"
              header-class="w250"
              v-slot="props"
            >
              <div style="min-width:100%">
                <div
                  style="min-width:100%"
                  v-if="props.row.mob !== '' && props.row.mob !== undefined"
                >
                  <div class="is-pulled-left">โทร:</div>
                  <div class="is-pulled-left tel" v-html="props.row.mob"></div>
                </div>

                <div
                  style="min-width:100%"
                  v-if="props.row.ema !== '' && props.row.ema !== undefined"
                >
                  <div class="is-pulled-left">อีเมล:</div>
                  <div class="is-pulled-left tel">
                    <a
                      title="ติดต่อทางอีเมล"
                      target="_blank"
                      :href="`mailto:${props.row.ema}`"
                    >
                      ติดต่อทางอีเมล</a
                    >
                  </div>
                </div>

                <div
                  style="min-width:100%"
                  v-if="props.row.w !== '' && props.row.w !== undefined"
                >
                  <div class="is-pulled-left">เว็บไซต์:</div>
                  <div class="is-pulled-left web">
                    <a title="เข้าเว็บ" target="_blank" :href="props.row.w"
                      >เข้าเว็บ</a
                    >
                  </div>
                </div>

                <div
                  style="min-width:100%"
                  v-if="props.row.lin !== '' && props.row.lin !== undefined"
                >
                  <div class="is-pulled-left">LINE:</div>
                  <div class="is-pulled-left tel" v-html="props.row.lin"></div>
                </div>
              </div>
            </b-table-column>

            <b-table-column
              field="rm"
              label="หมายเหตุ"
              v-slot="props"
              header-class="w300"
            >
              <div v-if="props.row.rm !== '' && props.row.rm !== undefined">
                <span v-html="props.row.rm"></span>
              </div>
              <div v-else>-</div>
            </b-table-column>
            <b-table-column
              field="rm"
              label="นำทาง"
              width="25"
              v-slot="props"
              cell-class="ignore-label"
            >
              <a
                title="นำทาง"
                class=" button mt-2 mr-1 is-small is-success is-outlined is-fullwidth "
                target="_blank"
                :href="`https://www.google.com/maps/dir//${props.row.n}`"
                >นำทาง</a
              >
              <a
                class=" button mt-2 is-info is-outlined is-small is-fullwidth"
                target="_blank"
                :href="
                  `mailto:report.lab.th@gmail.com?subject=แจ้งข้อมูลแลป ${props.row.n}ไม่ถูกต้อง`
                "
                >แจ้งข้อมูลไม่ถูกต้อง</a
              >
            </b-table-column>
            <b-table-column
              field="rm"
              label="นำทาง"
              v-slot="props"
              cell-class="ignore-label "
            >
              <div class="remark-visible has-text-weight-light	is-italic	">
                <div v-if="props.row.t === 'd'">
                  <small>* ข้อมูลจาก
                  <a
                    title="data.go.th/dataset/labscovid19"
                    target="_blank"
                    href="https://data.go.th/dataset/labscovid19"
                    >data.go.th/dataset/labscovid19</a
                  >
                  <span
                    v-if="props.row.src !== '' && props.row.src !== undefined"
                    >และ
                    <a
                      title="ข้อมูลอ้างอิง"
                      target="_blank"
                      :href="props.row.src"
                      >ข้อมูลอ้างอิง</a
                    ></span>
                  </small>
                </div>
                <div v-else>
                  <small>
                  * ข้อมูลรวบรวมจากผู้ใช้
                  <a
                    title="ข้อมูลอ้างอิง"
                    v-if="props.row.src !== '' && props.row.src !== undefined"
                    target="_blank"
                    :href="props.row.src"
                    >ข้อมูลอ้างอิง</a>
                  </small>
                  </div
                >
              </div>
            </b-table-column>

            <template #empty>
              <div class="has-text-centered">
                ไม่พบแลปตรวจโควิด หากท่านมีแลปแนะนำ สามารถแนะนำได้ที่
                <a
                  title="แนะนำแลปเพิ่มเติม"
                  target="_blank"
                  href="https://bit.ly/covid-lab-form"
                  >แนะนำแลปเพิ่มเติม</a
                >
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import json from "~/assets/data.json";

export default {
  data() {
    return {
      source: [],
      search: "",
      rt: false,
      at: false,
      ftf: false,
      dt: false,
      wi: false,
      isLoading: true,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 25
    };
  },
  created: function() {
    this.source = json.items;
    this.isLoading = false;
  },
  computed: {
    filterData() {
      const vm = this;
      if (this.search === "" && !vm.rt && !vm.at && !vm.ftf && !vm.dt && !vm.wi) {
        return this.source;
      } else {
        const keyword = this.search;
        return this.source.filter(
          w =>
          ((!vm.rt || w.rt) &&
           (!vm.at || w.at) &&
           (!vm.ftf || w.ftf) &&
           (!vm.dt || w.dt) &&
           (!vm.wi || w.wi) 
          ) &&
          (  w.n.includes(keyword) ||
            w.p.includes(keyword) ||
            w.adr.includes(keyword) )
        );
      }
    }
  }
};
</script>
