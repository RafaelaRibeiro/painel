import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import { Quill } from 'vue-quill-editor'

import ImageCompress from 'quill-image-compress'
import BlotFormatter from 'quill-blot-formatter'

Quill.register('modules/blotFormatter', BlotFormatter)
Quill.register('modules/imageCompress', ImageCompress)

Vue.use(VueQuillEditor)
