// @ts-nocheck

import { create } from "zustand";

/* ========= TYPES ========= */

export type LayerType = "input" | "dense" | "output";

export interface Layer {
  id: string;
  type: LayerType;
  units: number;
  activation?: string;
}

export interface TrainingParams {
  learningRate: number;
  epochs: number;
}

export interface ModelStore {
  layers: Layer[];
  training: TrainingParams;

  addLayer: (layer: Layer) => void;
  removeLayer: (id: string) => void;
  updateUnits: (id: string, units: number) => void;
  setLearningRate: (lr: number) => void;
}

/* ========= STORE ========= */

export const useModelStore = create<ModelStore>((set) => ({
  layers: [
    { id: "input", type: "input", units: 784 },
    { id: "output", type: "output", units: 10, activation: "softmax" }
  ],

  training: {
    learningRate: 0.001,
    epochs: 10
  },

  addLayer: (layer) =>
    set((prev: ModelStore) => ({
      layers: [
        ...prev.layers.slice(0, -1),
        layer,
        prev.layers[prev.layers.length - 1]
      ],
      training: prev.training
    })),

  removeLayer: (id) =>
    set((prev: ModelStore) => ({
      layers: prev.layers.filter((l: Layer) => l.id !== id),
      training: prev.training
    })),

  updateUnits: (id, units) =>
    set((prev: ModelStore) => ({
      layers: prev.layers.map((l: Layer) =>
        l.id === id ? { ...l, units } : l
      ),
      training: prev.training
    })),

  setLearningRate: (lr) =>
    set((prev: ModelStore) => ({
      layers: prev.layers,
      training: { ...prev.training, learningRate: lr }
    }))
}));
