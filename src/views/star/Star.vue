<template>
  <main :class="c.main">
    <DataBlock :class="s.header" :req="baseInfoReq" :handler="dataHandler">
      <template v-slot="{ data: { nickname, avatar, gender, isLive, certification, displayId, location, age, tags, description } }">
        <div style="display:flex">
          <div :class="[s.avatarContainer, c[gender], s[gender]]">
            <div :class="{ [s.avatar]: true, [s.live]: isLive }">
              <img :src="avatar" referrerpolicy="no-referrer" @error="onAvatarError" alt="头像" />
            </div>
          </div>
          <div>
            <div>
              <span :class="[c.ellipsis1, s.name]">{{ nickname || '未知' }}</span>
              <span v-if="certification" :class="s.certified">{{ certification }}</span>
            </div>
            <div :class="s.baseInfo">
              <span v-if="displayId">{{ platName }}号 ：{{ displayId }}</span>
              <span v-if="location">{{ location }}</span>
              <span v-if="age">{{ age }}岁</span>
            </div>
            <div :class="s.tags">
              <span :class="s.tag1">{{ platName }}</span>
              <span v-for="name in tags" :key="name" :class="s.tag2">#{{ name }}</span>
            </div>
            <div v-if="description" :class="s.intro">简介：{{ description }}</div>
          </div>
        </div>
        <a-button v-if="selected[itemId]" :class="s.addBtn" icon="check" @click="removeSelected(itemId)">已添加</a-button>
        <a-button v-else :class="s.addBtn" type="primary" @click="addSelected({ id: itemId })"><i :class="c.plus"></i>添加红人</a-button>
      </template>
    </DataBlock>
    <div :class="s.body">
      <NavList :list="navList" :active="$route.meta.navKey" @itemClick="onNavChange"></NavList>
      <router-view :class="s.content"></router-view>
    </div>
    <FixedNav></FixedNav>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  props: ['platform', 'room'],
  data() {
    return {
      navList: [
        {
          key: 'video',
          text: '作品数据分析',
          svg:
            '<svg height="16" viewBox="0 0 16 16" width="16"><path d="m6.7000078 3.66665935-2.26665889-2.66665935h-2.56667486l2.26667451 2.66665935zm6.6666796 0-2.2666745-2.66665935h-2.56665922l2.26665892 2.66665935zm-3.333332 0-2.26667449-2.66665935h-2.56667486l2.26667451 2.66665935zm4.300005-2.66665935h-2.4666747l2.2666745 2.66665935h1.2000014v-1.66665935c0-.56667137-.4333443-1-1.0000012-1zm-13.23335912 0h-.10000128c-.56665575 0-1 .43332863-1 1v1.66665935h3.36667579zm-1.10000128 13.6666722c0 .5666725.43334425 1.0000011 1 1.0000011h13.3333604c.5666569 0 1.0000012-.4333286 1.0000012-1.0000011v-10.3333402h-15.3333616zm5.33334996-7.33333671c0-.56667253.46665679-.83332909 1-.83332909.1666576 0 .36665784.03332816.53332991.13332828l3.80000443 2.20000256c.6666657.3666723.6666657 1.30000156 0 1.66666916l-3.80000443 2.2000072c-.16667207.1000001-.33332852.1333283-.53332991.1333283-.53334321 0-1-.2666722-1-.8333355z" fill="currentColor"/></svg>'
        },
        {
          key: 'live',
          text: '直播数据分析',
          svg:
            '<svg height="16" viewBox="0 0 16 16" width="16"><path d="m14.2097384 3.1257702h-3.7009405l2.0131902-1.50989643v.00000001c.401933-.28104708.4999312-.83471275.2188841-1.23664575-.2810471-.40193301-.8347128-.49993117-1.2366458-.21888408-.0160191.01120117-.031664.02292818-.0469092.03516188l-3.46381209 2.5975476-3.46381213-2.5975476.00000005.00000004c-.38736585-.3008093-.94524045-.23064174-1.24604974.15672412-.3008093.38736585-.23064174.94524044.15672412 1.24604974.00771759.00599311.01553353.01185844.0234448.01759363l2.01319018 1.50989643h-3.70094048-.00000007c-.98089327.00000005-1.77606184.79517161-1.77606184 1.77606184v8.88152477.0000003c0 .9808932.7951716 1.7760618 1.77606184 1.7760618h12.43366366-.0000001c.9808933 0 1.7760618-.7951716 1.7760618-1.7760618v-.0000001-8.88152472c0-.98089327-.7951716-1.77606183-1.7760618-1.77606183zm-3.4105699 6.71951778-3.84249423 2.56126272c-.40893016.2722174-.74042969.0919488-.74042969-.3907832v-5.32335358c0-.48394179.33270903-.66299906.74042969-.39078314l3.84249423 2.55641558c.4089301.27221745.4065112.71502265 0 .9872401z" fill="currentColor"/></svg>'
        },
        // {
        //   key: 'danmu',
        //   text: '互动数据分析',
        //   svg:
        //     '<svg height="16" viewBox="0 0 16 16" width="16"><path d="m14.5264875 8.01140638c.6086404.64301546.9746335 1.46599435.9746335 2.36176742 0 1.2860309-.7522068 2.4204073-1.8966934 3.0876875-.0141544.5762874.032353 1.4073545.3943019 1.6338254 0 0-1.0170967.0525736-1.8481639-1.0919131-.3033092.0586398-.6187507.0909928-.9422805.0909928-1.34467068 0-2.54375296-.5358462-3.33033476-1.3729795 3.25956266-.0505516 5.97114666-2.048348 6.64853716-4.70938052zm-7.58475148-8.01140638c3.83382798 0 6.94173598 2.69338549 6.93971498 6.01967612 0 .44687552-.0586408.88161868-.16581 1.3022074-.6773905 2.66103251-3.3889746 4.65882898-6.64853719 4.70938048l-.12738985.0020221c-.52371385 0-1.03327326-.0525736-1.52261207-.1476105-1.20838376 1.6651674-2.66244795 1.7628936-2.94117695 1.7657872l-.04201514-.0003195c.58098341-.3682234.65782174-1.70885.633557-2.6430423-1.85018597-1.07978062-3.0674668-2.91379011-3.0674668-4.992469 0-3.32224651 3.10790803-6.015632 6.94173602-6.015632zm-3.06544474 4.958094c-.51158148 0-.92610402.41452255-.92610402.92610402 0 .51158148.41452254.92610402.92610402.92610402.51158147 0 .92610401-.41452254.92610401-.92610402 0-.51158147-.41452254-.92610402-.92610401-.92610402zm3.06544474 0c-.51158148 0-.92610402.41452255-.92610402.92610402 0 .51158148.41452254.92610402.92610402.92610402s.92610402-.41452254.92610402-.92610402c0-.51158147-.41452254-.92610402-.92610402-.92610402zm3.06544478 0c-.51158152 0-.92610406.41452255-.92610406.92610402 0 .51158148.41452254.92610402.92610406.92610402.5115814 0 .926104-.41452254.926104-.92610402 0-.51158147-.4145226-.92610402-.926104-.92610402z" fill="currentColor"/></svg>'
        // },
        {
          key: 'commerce',
          text: '带货直播分析',
          svg:
            '<svg height="16" viewBox="0 0 16 16" width="16"><path d="m8 0c.76052913 0 1.50047034.09539429 2.0901168.2853873.9429406.30446616 1.6157648.86252276 1.6157648 1.80334895 0 .67094047-.2524112 1.38917937-.6625288 2.02712869 2.3235883 1.33114721 3.9566472 4.06498922 3.9566472 6.78411776 0 3.5514438-2.5994643 5.0638532-6.84229443 5.1000173h-.31541114c-4.24283016-.0365679-6.84229443-1.5489648-6.84229443-5.1004085 0-2.66984777 1.5741759-5.35361336 3.83064723-6.70940472l.12600001-.07393058-.07988242-.12878229c-.36276537-.60535689-.58264773-1.27271821-.58264773-1.89873766 0-.94082619.6728242-1.49888279 1.61576478-1.80334895.58964644-.18999301 1.32958765-.2853873 2.09011813-.2853873zm1.67176317 6.33576461-.00000001-.00000001c-.2237774-.21620594-.58068091-.23405697-.8264118-.04133759l-.04694118.04093999-.79841116.77150133-.79882421-.77110447-.04652948-.04093999.00000002.00000001c-.26480461-.20757202-.65379103-.16862394-.86882293.08699177-.18423448.21900442-.18423448.53267836.0000002.75168279l.04200001.0457097.5929412.57196889h-.5678242l-.05929412.00278233h.00000001c-.33952447.03177431-.5880811.32322082-.55516437.65096542.02850249.28379243.26116821.50838636.55516437.53589979l.05929373.00238458h1.02941117v.79495304h-1.02941117l-.05929412.00278233h-.00000002c-.33952446.03177431-.58808109.32322078-.55516436.65096358.02850248.2837924.26116821.5083863.55516436.5358998l.05929412.0027823h1.02941117v1.3911674l.00288235.0572365v.0000001c.0282037.2841632.26111224.5091577.55547126.5365929l.05929412.0023848.05929412-.0027823h.00000001c.29437832-.027225.52746096-.2520515.55588237-.536196l.00247059-.0572366v-1.3911674h1.02941117l.05929412-.0027823h.00000004c.33952445-.0317743.58808105-.3232208.55516435-.6509654-.0285025-.28379247-.2611682-.5083864-.55516435-.53589983l-.05929412-.00278233h-1.02941117v-.79495304h1.02941117l.05929412-.00278233c.29437835-.02722501.52746095-.25205147.55588235-.53619603l.0024706-.05723658-.0028823-.05723657v-.0000001c-.0282037-.2841632-.2611123-.50915771-.55547129-.53659289l-.05929393-.00238484h-.56823532l.5929412-.57236574.0428236-.04491488-.00000001.00000001c.20000764-.23717033.18168629-.58196107-.0424117-.79813161z" fill="currentColor"/></svg>'
        },
        // {
        //   key: 'records',
        //   text: '带货直播记录',
        //   svg:
        //     '<svg height="16" viewBox="0 0 16 16" width="16"><path d="m13 1c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2zm-1.5 10h-5c-.27614237 0-.5.2238576-.5.5s.22385763.5.5.5h5c.2761424 0 .5-.2238576.5-.5s-.2238576-.5-.5-.5zm-7.5 0c-.27614237 0-.5.2238576-.5.5s.22385763.5.5.5.5-.2238576.5-.5-.22385763-.5-.5-.5zm6.5-3h-4c-.27614237 0-.5.22385763-.5.5s.22385763.5.5.5h4c.2761424 0 .5-.22385763.5-.5s-.2238576-.5-.5-.5zm-6.5 0c-.27614237 0-.5.22385763-.5.5s.22385763.5.5.5.5-.22385763.5-.5-.22385763-.5-.5-.5zm8-4h-5c-.55228475 0-1 .44771525-1 1s.44771525 1 1 1h5c.5522847 0 1-.44771525 1-1s-.4477153-1-1-1zm-8 0c-.55228475 0-1 .44771525-1 1s.44771525 1 1 1 1-.44771525 1-1-.44771525-1-1-1z" fill="currentColor"/></svg>'
        // },
        {
          key: 'fans',
          text: '粉丝分析',
          svg:
            '<svg height="16" viewBox="0 0 16 16" width="16"><path d="m1.7685588 8.22873931c-.80713671-.34231365-1.0996494-1.13931531-.2800665-1.57160643.81919452-.43269227 2.57389504.0059985 3.13946163.67423116v-6.63553829c0-.38430314.30340538-.69582575.67682738-.69582575h.79352176c.373422 0 .67643901.31152261.67643901.69582575v3.561908c0 .17195688.12214017.31831966.28784674.3439145l3.93843518.61304648c.184802.02871162.3572544-.10203014.3851826-.29201999.0025249-.01717623.0037949-.03452267.0037994-.05189395v-3.62309268c0-.38470429.303017-.69582575.6768274-.69582575h.2567276c.373422 0 .676439.31112146.676439.69582575v14.05648619c0 .3843031-.303017.6958257-.6768274.6958257h-7.01838268-.00000003c-.37380126 0-.67682739-.311532-.67682739-.6958257v-3.6506858c-.56246689-1.71397142-1.51585995-2.85567864-2.85979626-3.42474863zm4.27101418 5.01273839h5.22674112c.186711 0 .3384137.155961.3384137.3479129v.9593604c0 .1919519-.1517027.3479129-.3384137.3479129h-5.22674112-.00000002c-.18690063 0-.33841369-.155766-.33841369-.3479129v-.9597597c0-.1919519.15170269-.3479128.33841369-.3479128z" fill="currentColor"/></svg>'
        }
      ]
    }
  },
  computed: {
    ...mapState('selected', { selected: 'hash' }),
    ...mapGetters('enum', ['platformLabels']),
    itemId() {
      return `${this.platform}/${this.room}`
    },
    platName() {
      return this.platformLabels[this.platform]
    },
    baseInfoReq() {
      return {
        url: 'v1_front_anchor/baseInfo',
        params: {
          platform: this.platform,
          roomid: this.room
        }
      }
    }
  },
  methods: {
    ...mapMutations('selected', { addSelected: 'add', removeSelected: 'remove' }),
    onNavChange(key) {
      const { platform, room } = this.$route.params
      this.$router.replace(`/star/${platform}/${room}/${key}`)
    },
    dataHandler(data) {
      if (!data) return null
      const { video_basic_data, live_basic_data } = data
      let gender = ''
      if (video_basic_data.sex == 1 || live_basic_data.sex == 1) {
        gender = 'male'
      } else if (video_basic_data.sex == 2 || live_basic_data.sex == 2) {
        gender = 'female'
      }
      return {
        avatar: `https://xhlcdn.xiaohulu.com/avatar/${this.platform}/${this.room}`,
        nickname: video_basic_data.nickname || live_basic_data.nickname,
        gender,
        isLive: video_basic_data.is_live || live_basic_data.is_live,
        certification: video_basic_data.certification,
        location: video_basic_data.location || live_basic_data.location,
        displayId: video_basic_data.display_id,
        age: video_basic_data.age || live_basic_data.age,
        tags: (video_basic_data.tagName || []).slice(0, 6),
        description: video_basic_data.description || live_basic_data.description
      }
    }
  }
}
</script>

<style lang="less" module="s">
.header {
  background: #fff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 30px;
  position: relative;
}
.avatarContainer {
  flex: 0 0 auto;
  position: relative;
  width: 120px;
  height: 120px;
  margin-right: 30px;
  &.male::after,
  &.female::after {
    position: absolute;
    width: 28px;
    height: 28px;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
}
.avatar {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
  &.live {
    border: 3px solid #ff5e66;
    &::after {
      content: '直播中';
      width: 112px;
      line-height: 25px;
      text-align: center;
      background: #ff5e66;
      color: #fff;
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
.name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-right: 20px;
  max-width: 400px;
}
.certified {
  display: inline-block;
  color: #736af2;
  vertical-align: middle;
  margin-top: -4px;
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: -2px 5px 0 0;
    background: url(~@/assets/certified.svg) no-repeat 0 0 / contain;
    vertical-align: middle;
  }
}
.baseInfo {
  color: #666;
  margin-top: 12px;
  span {
    &::after {
      content: '|';
      padding: 0 20px;
    }
    &:last-child::after {
      content: none;
    }
  }
}
.tags {
  margin-top: 14px;
}
.tag {
  display: inline-block;
  height: 20px;
  line-height: 18px;
  padding: 0 5px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  margin-right: 10px;
}
.tag1 {
  composes: tag;
  color: #ff7b00;
  border-color: #ffc349;
  background: #fff5e9;
}
.tag2 {
  composes: tag;
  border-color: #d5d2fb;
  background: #eeedfd;
  color: #736af2;
}
.intro {
  margin-top: 20px;
  color: #999;
}
.addBtn {
  position: absolute;
  right: 30px;
  top: 30px;
}
.body {
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
}
.content {
  flex: 1;
  margin-left: 20px;
}
</style>
