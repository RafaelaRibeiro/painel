<template>
  <section class="container">
    <client-only>
      <quill-editor
        ref="editor"
        :value="value"
        :options="editorOption"
        @ready="onEditorReady"
        @input="updateContent"
      />
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'quill-example-nuxt',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: '<p>I am Example</p>',
      editorOption: {
        // Some Quill options...
        placeholder: 'Escreva aqui...',
        theme: 'snow',
        clipboard: {
          matchVisual: true,
        },
        modules: {
          //imageDrop: true,

          blotFormatter: {},
          imageCompress: {
            quality: 0.7, // default
            maxWidth: 1000, // default
            maxHeight: 1000, // default
            imageType: 'image/jpeg', // default
            debug: true, // default
            suppressErrorLogging: false, // default
            insertIntoEditor: undefined, // default
          },
          toolbar: [
            [{ font: [] }],
            [{ size: ['normal', 'small', 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ align: [] }],
            [{ indent: '-1' }, { indent: '+1' }], // dropdown with defaults from theme
            ['link'],
            ['blockquote', 'code-block'],
            ['clean'], // remove formatting bu
          ],
        },
      },
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log('Quill Editor ready!', editor)
      // Agora você pode acessar o objeto quill aqui
      console.log('Quill instance:', editor.quill)
    },

    updateContent(content) {
      // Emitir evento para notificar o componente pai sobre a alteração do conteúdo
      this.$emit('input', content)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 5px 0;

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  ::v-deep .ql-container {
    height: 30vh !important;
  }

  ::v-deep .ql-editor p {
    margin-bottom: 0px !important;
  }
}
</style>
