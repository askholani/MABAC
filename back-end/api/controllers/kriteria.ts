import { ModelKriteria } from '../models/ktriteria'

export const ControllerKriteria = {
  create: async (req: any, res: any) => {
    const data = req.body

    try {
      const result = await ModelKriteria.create(data)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  findAll: async (req: any, res: any) => {
    try {
      const result = await ModelKriteria.findAll()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  findById: async (req: any, res: any) => {
    try {
      const result = await ModelKriteria.findById(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const result = await ModelKriteria.update(req.params.id, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      await ModelKriteria.delete(req.params.id)
      res.status(200).json({ message: 'Data Deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },
}
