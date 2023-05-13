import DiffDate from '../../components/DiffDate.vue'
import AddNote from '../../components/AddNote.vue'
import Calculator from '../../components/Calculator.vue'
import ConvSpeed from '../../components/ConvSpeed.vue'
import ConvAngle from '../../components/ConvAngle.vue'
import ConvTemp from '../../components/ConvTemp.vue'
import FecharSVG from '../../svg/fechar.vue'
import PaletaSVG from '../../svg/paleta.vue'
import CalcUnit from '../../svg/calcunit.vue'
import BucketSVG from '../../svg/bucket.vue'
import HamburgerSVG from '../../svg/hamburger.vue'

export default {
  components: {
    DiffDate,
    AddNote,
    Calculator,
    ConvSpeed,
    ConvAngle,
    ConvTemp,
    FecharSVG,
    PaletaSVG,
    CalcUnit,
    BucketSVG,
    HamburgerSVG
  },
  data() {
    return {
      boxes: [],
      active: 'yellow',
      count: 0,
      colorBG: '#ffffff',
      bucketColor: "#000"
    }
  },
  methods: {
    openMenu(open) {
      if(open == true) {
        document.getElementById('full').style.display = 'flex'
      } else {
        document.getElementById('full').style.display = 'none'
      }
    },
    inptColor() {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = this.colorBG;
      if(this.hexLuminosity(this.colorBG) >= 50) {
        this.isLight()
      } else {
        this.isDark()
      }
      this.bucketColor = '#'+this.hexComplimentary(this.colorBG.replace('#',''));

    },
    hexLuminosity(H) {
      // Convert hex to RGB first
      let r = 0, g = 0, b = 0;
      if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
      } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
      }
      // Then to HSL
      r /= 255;
      g /= 255;
      b /= 255;
      let cmin = Math.min(r,g,b),
          cmax = Math.max(r,g,b),
          l = 0;

      l = (cmax + cmin) / 2;
      l = +(l * 100).toFixed(1);

      return l;
    },
    hexComplimentary(hexnum){
      hexnum = hexnum.toUpperCase();
      var splitnum = hexnum.split("");
      var resultnum = "";
      var simplenum = "FEDCBA9876".split("");
      var complexnum = new Array();
      complexnum.A = "5";
      complexnum.B = "4";
      complexnum.C = "3";
      complexnum.D = "2";
      complexnum.E = "1";
      complexnum.F = "0";
    
      for(let i=0; i<6; i++){
        if(!isNaN(splitnum[i])) {
          resultnum += simplenum[splitnum[i]]; 
        } else if(complexnum[splitnum[i]]){
          resultnum += complexnum[splitnum[i]]; 
        } else {
          alert("Hex colors must only include hex numbers 0-9, and A-F");
          return false;
        }
      }
    
      return resultnum;
    },
    isDark() {
      document.getElementById('logo').style.fill = '#fff';
      document.getElementById('btn-hamburger').style.borderColor = '#fff';
      document.getElementById('hamburger').style.fill = '#fff';
    },
    isLight() {
      document.getElementById('logo').style.fill = '#000';
      document.getElementById('btn-hamburger').style.borderColor = '#000';
      document.getElementById('hamburger').style.fill = '#000';
    },
    addBox(type) {
      this.count++
      this.boxes.push({
        id: this.count,
        type: type,
        color: this.active
      })
    },
    remove(id) {
      this.boxes[this.boxes.findIndex(obj => obj.id == id)] = {}
    },
    changeColorActive(color) {
      this.active = color
    },
    changeImage(img) {
      if(img === 0 || img === 9) {
        if(img === 9) {
          document.body.style.backgroundImage = `url('img/background${img}.png')`;
          this.isDark()
        }
        else {
          document.body.style.backgroundImage = `url('img/background${img}.jpg')`
          this.isLight()
        }
        document.body.style.backgroundSize = 'unset'
      }
      else {
        document.body.style.backgroundImage = `url('img/background${img}.png')`;
        document.body.style.backgroundSize = '100px';
        this.isLight()
      }
    },
    changeColor(box) {
      switch (box.color) {
        case 'yellow':
          box.color = 'green'
          break
        case 'green':
          box.color = 'pink'
          break
        case 'pink':
          box.color = 'purple'
          break
        case 'purple':
          box.color = 'blue'
          break
        case 'blue':
          box.color = 'gray'
          break
        case 'gray':
          box.color = 'yellow'
          break
      }
    },
  },
  mounted() {},
}