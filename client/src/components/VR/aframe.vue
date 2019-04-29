<template>
  <b-container id="font">
    <!-- one -->
    <b-row class="justify-content-md-center">
      <b-col sm="10">
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            caption="our bins are limited"
            img-src="https://3dexport.com/items/2015/11/30/399661/180128/garbagerecycle_bins_package_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1932221_o.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="different and modern"
            img-src="https://3dexport.com/items/2015/11/30/399661/180128/garbagerecycle_bins_package_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1932222_o.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="everyone needs bin to make around clean"
            img-src="https://img-new.cgtrader.com/items/833355/6bd7ee7389/garbage-recycle-bins-package-3d-model-low-poly-obj-fbx-ma-mb.jpg"
          ></b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6" class="aframe">
        <a-scene embedded look-controls-enabled="false" vr-mode-ui="enabled: false">
          <a-assets>
            <img id="texture" src="../../assets/texture11.jpg" alt="" />
          </a-assets>
          <a-cylinder
            position="-0.3 1.8 -3"
            src="#texture"
            height="2"
            width="1"
            animation="property: rotation; direction: normal;to: 0 360 0; loop: true; dur: 10000; easing:linear;  repeat: indefinite; fill:forwards"
          ></a-cylinder>
        </a-scene>
      </b-col>
      <b-col sm="6" class="text-center">
        <div class="mg">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </b-col>
      <b-col sm="6">
        <div class="mg">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </b-col>

      <b-col sm="6" class="aframe">
        <a-scene
          embedded
          wasd-controls-enabled="false"
          look-controls-enabled="false"
          vr-mode-ui="enabled: false"
        >
          <a-assets>
            <img id="texture3" src="../../assets/texture23.jpg" alt="" />
          </a-assets>
          <a-cylinder
            position="-0.3 1.8 -3"
            src="#texture3"
            height="2"
            width="1"
            segments-radial="8"
            open-ended="true"
            side="double"
            animation="property: rotation; direction: normal;to: 360 0 0; loop: true; dur: 10000; easing:linear"
          ></a-cylinder>
        </a-scene>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Aframe',
};
</script>

<style lang="stylus" scoped>
@import url('https://rsms.me/inter/inter.css');

.aframe
  height 400px
#aframe2
  height 600px
#font
  font-family 'Inter', sans-serif

.mg
  margin-top 100px
</style>
