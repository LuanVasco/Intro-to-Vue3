  app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true,
      }
    },
    template:
    /*html*/
    ` <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :class="{ 'out-of-stock-img': !inStock }" :src="image" alt="">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <small v-if="onSale">{{ saleMessage }}</small>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
        <!-- <p>{{ description }}</p>
        <a :href="github">Meu Github</a> -->
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color}"
        ></div>
        <div>
          <button 
            class="button"
            :class="{disabledButton: !inStock}"
            :disabled="!inStock"
            v-on:click="addToCart">
            Add to Cart
          </button>
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            @click="removeFromCart">
            Remove Item
          </button>
        </div>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      description: 'A warm fuzzy pair of socks.',
      selectedVariant: 0,
      github: 'https://github.com/LuanVasco',
      details: ['50% cottom', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg',  quantity: 0},
      ],
      sizes: ['p', 'm', 'g'],
      onSale: true,
      reviews: [],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    title() {
      return  this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    }, 
    saleMessage() {
     return this.onSale ? this.brand + ' ' + this.product + ' is on sale.' : ''
    },
    shipping() {
      return this.premium ? 'Free' : '2.99$'
    }
  }
  })