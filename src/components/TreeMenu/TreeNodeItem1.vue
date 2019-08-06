<template>
  <li>
    <a @click="onSelect" :class="['lv'+level,isSelected?'active':'']" href="javascript:;">
      <span @click.stop.prevent="onExpand">
        <a-icon type="caret-right" :class="{'rotate-caret ':isExpanded}" />
      </span>
      <span>
        <a-icon type="solution" />
      </span>
      <span class="title">
        <span class="title-text">{{ treeNode.title }}</span>
        <span @click.stop.prevent="rightClick" class="title-action">
          <a-icon type="down-circle" />
        </span>
      </span>
    </a>
    <slot v-if="isExpanded"></slot>
  </li>
</template>
<script>

export default {
  name: 'TreeNodeItem',
  components: {},
  props: {
    treeNode: {
      type: Object,
      default: Object.assign({})
    },
    level: {
      type: Number,
      default: 0
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    eventKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onExpand (event) {
      const info = { eventKey: this.eventKey, node: this.treeNode, expanded: this.isExpanded }
      this.$emit('expand', event, info)
    },
    onSelect (event) {
      const info = { eventKey: this.eventKey, node: this.treeNode, selected: this.isSelected }
      this.$emit('select', event, info)
    },
    rightClick (e) {
      const info = { eventKey: this.eventKey, node: this.treeNode }
      this.$emit('rightClick', e, info)
    }
  }
}
</script>
