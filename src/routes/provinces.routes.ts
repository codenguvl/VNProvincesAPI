import { Router } from 'express'
import {
  getProvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId,
  searchProvinces,
  searchWardsByDistrictId,
  searchDistrictsByProvinceId
} from '../controllers/provinces.controller'

const router = Router()

router.get('/provinces', getProvinces)
router.get('/province/district/:province_id', getDistrictsByProvinceId)
router.get('/province/ward/:district_id', getWardsByDistrictId)

router.get('/provinces/search', searchProvinces)
router.get('/districts/:province_id/search', searchDistrictsByProvinceId)
router.get('/wards/:district_id/search', searchWardsByDistrictId)

export default router
